const { google } = require('googleapis')

const PROJECT_ID = process.env.PROJECT_ID || 'blog-towles-staging'
const INSTANCE_NAME = process.env.INSTANCE_NAME || 'blog-towles-staging-db'

exports.stopSql = async (req, res) => {
  // Default to 'off', accept 'on' via query param or body
  const action = req.query?.action || req.body?.action || 'off'
  const policy = action === 'on' ? 'ALWAYS' : 'NEVER'

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  })

  const sqladmin = google.sqladmin({ version: 'v1', auth })

  console.log(`Setting Cloud SQL instance ${INSTANCE_NAME} to ${policy}`)

  try {
    await sqladmin.instances.patch({
      project: PROJECT_ID,
      instance: INSTANCE_NAME,
      requestBody: {
        settings: {
          activationPolicy: policy
        }
      }
    })

    const message = action === 'on' ? 'Cloud SQL started' : 'Cloud SQL stopped'
    console.log(message)
    res.status(200).send(message)
  } catch (error) {
    console.error('Failed to update Cloud SQL:', error.message)
    res.status(500).send(`Error: ${error.message}`)
  }
}
