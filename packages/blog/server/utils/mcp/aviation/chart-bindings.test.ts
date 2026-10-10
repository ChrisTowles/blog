import { describe, it, expect } from 'vitest';
import { resolveChartOption } from './chart-bindings';

const ROWS = [
  { operator: 'FEDEX', age: 32.1, fleet: 120 },
  { operator: 'UPS', age: 28.5, fleet: 95 },
  { operator: 'DELTA', age: 18.2, fleet: 860 },
];

describe('resolveChartOption', () => {
  it('leaves static options unchanged', () => {
    const opt = {
      title: { text: 'Static' },
      xAxis: { type: 'category', data: ['a', 'b'] },
      series: [{ type: 'bar', data: [1, 2] }],
    };

    expect(resolveChartOption(opt, ROWS)).toEqual(opt);
  });

  it('resolves $rows.column string to array of column values', () => {
    const opt = { yAxis: { data: '$rows.operator' } };
    expect(resolveChartOption(opt, ROWS)).toEqual({
      yAxis: { data: ['FEDEX', 'UPS', 'DELTA'] },
    });
  });

  it('resolves $rows.column in series data', () => {
    const opt = { series: [{ type: 'bar', data: '$rows.age' }] };
    expect(resolveChartOption(opt, ROWS)).toEqual({
      series: [{ type: 'bar', data: [32.1, 28.5, 18.2] }],
    });
  });

  it('resolves $rows object template to array of objects (pie)', () => {
    const opt = {
      series: [{ type: 'pie', data: { $rows: { name: 'operator', value: 'fleet' } } }],
    };

    expect(resolveChartOption(opt, ROWS)).toEqual({
      series: [
        {
          type: 'pie',
          data: [
            { name: 'FEDEX', value: 120 },
            { name: 'UPS', value: 95 },
            { name: 'DELTA', value: 860 },
          ],
        },
      ],
    });
  });

  it('resolves $rows pair array template (scatter)', () => {
    const opt = { series: [{ type: 'scatter', data: { $rows: ['age', 'fleet'] } }] };
    expect(resolveChartOption(opt, ROWS)).toEqual({
      series: [
        {
          type: 'scatter',
          data: [
            [32.1, 120],
            [28.5, 95],
            [18.2, 860],
          ],
        },
      ],
    });
  });

  it('passes through unknown columns as null', () => {
    const opt = { data: '$rows.nonexistent' };
    expect(resolveChartOption(opt, ROWS)).toEqual({ data: [null, null, null] });
  });

  it('object template unknown columns resolve to null (not the column name)', () => {
    const opt = { series: [{ data: { $rows: { name: 'nonexistent', value: 'fleet' } } }] };

    expect(resolveChartOption(opt, ROWS)).toEqual({
      series: [
        {
          data: [
            { name: null, value: 120 },
            { name: null, value: 95 },
            { name: null, value: 860 },
          ],
        },
      ],
    });
  });

  it('leaves non-$rows strings alone', () => {
    expect(resolveChartOption('$prefix.something', ROWS)).toBe('$prefix.something');
    expect(resolveChartOption('plain string', ROWS)).toBe('plain string');
  });

  it('handles empty rows', () => {
    expect(resolveChartOption({ data: '$rows.operator' }, [])).toEqual({ data: [] });
  });

  it('preserves literal values inside object templates', () => {
    const opt = {
      series: [
        {
          type: 'pie',
          data: { $rows: { name: 'operator', value: 'fleet', itemStyle: { color: '#f00' } } },
        },
      ],
    };

    expect(resolveChartOption(opt, ROWS)).toMatchObject({
      series: [
        {
          data: [
            { name: 'FEDEX', value: 120, itemStyle: { color: '#f00' } },
            { name: 'UPS', value: 95, itemStyle: { color: '#f00' } },
            { name: 'DELTA', value: 860, itemStyle: { color: '#f00' } },
          ],
        },
      ],
    });
  });
});
