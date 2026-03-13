const {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} = process.env

// 1. Refresh Strava access token
const tokenRes = await fetch('https://www.strava.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    refresh_token: STRAVA_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  }),
})
const tokenData = await tokenRes.json()
const accessToken = tokenData.access_token

if (!accessToken) {
  console.error('Failed to get access token:', tokenData)
  process.exit(1)
}
console.log('✓ Access token refreshed')

const stravaHeaders = { Authorization: `Bearer ${accessToken}` }

// 2. Get athlete ID
const athleteRes = await fetch('https://www.strava.com/api/v3/athlete', { headers: stravaHeaders })
const athlete = await athleteRes.json()
const athleteId = athlete.id
console.log(`✓ Athlete ID: ${athleteId}`)

// 3. Fetch YTD stats
const statsRes = await fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
  headers: stravaHeaders,
})
const stats = await statsRes.json()
console.log('✓ Stats fetched')

const year = new Date().getFullYear()
const statsRow = {
  year,
  run_distance: stats.ytd_run_totals.distance,
  run_time: stats.ytd_run_totals.moving_time,
  run_count: stats.ytd_run_totals.count,
  ride_distance: stats.ytd_ride_totals.distance,
  ride_time: stats.ytd_ride_totals.moving_time,
  ride_count: stats.ytd_ride_totals.count,
  updated_at: new Date().toISOString(),
}

// 4. Fetch last 10 activities
const activitiesRes = await fetch(
  'https://www.strava.com/api/v3/athlete/activities?per_page=10',
  { headers: stravaHeaders }
)
const activities = await activitiesRes.json()
if (!Array.isArray(activities)) {
  console.error('Failed to fetch activities:', activities)
  process.exit(1)
}
console.log(`✓ ${activities.length} activities fetched`)

const activityRows = activities.map((a) => ({
  id: a.id,
  name: a.name,
  sport_type: a.sport_type,
  distance: a.distance,
  moving_time: a.moving_time,
  elevation_gain: a.total_elevation_gain,
  start_date: a.start_date,
  updated_at: new Date().toISOString(),
}))

// 5. Upsert into Supabase
const supabaseHeaders = {
  'Content-Type': 'application/json',
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  Prefer: 'resolution=merge-duplicates',
}

const statsUpsert = await fetch(`${SUPABASE_URL}/rest/v1/strava_stats`, {
  method: 'POST',
  headers: supabaseHeaders,
  body: JSON.stringify(statsRow),
})
if (!statsUpsert.ok) {
  console.error('Failed to upsert stats:', await statsUpsert.text())
  process.exit(1)
}
console.log('✓ Stats upserted')

const activitiesUpsert = await fetch(`${SUPABASE_URL}/rest/v1/strava_activities`, {
  method: 'POST',
  headers: supabaseHeaders,
  body: JSON.stringify(activityRows),
})
if (!activitiesUpsert.ok) {
  console.error('Failed to upsert activities:', await activitiesUpsert.text())
  process.exit(1)
}
console.log('✓ Activities upserted')
console.log('Strava sync complete.')
