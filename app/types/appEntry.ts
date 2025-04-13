
import { z } from 'zod'

export enum AppType {
    MobileAndroid,
}


export const AppEntrySchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
})