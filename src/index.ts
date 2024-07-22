import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from './users/users.router'
import { vehicleSpecRouter } from './vehiclespec/vehiclespec.router'
import { vehicleRouter } from './vehicle/vehicle.router'
import { locationRouter } from './location/location.router'
import { bookingRouter } from './booking/booking.router'
import { paymentRouter } from './payment/payment.router'
import { customerSupportTicketRouter } from './custsupp/custSupp.router'
import { fleetRouter } from './fleet/fleet.router'
import { authRouter } from './auth/auth.router'
import 'dotenv/config'

import { cors } from 'hono/cors';
import { stripeRouter } from './stripe/stripe.router'

const app = new Hono()

app.use('/*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', userRouter)
app.route('/', vehicleSpecRouter)
app.route('/', vehicleRouter)
app.route('/', locationRouter)
app.route('/', bookingRouter)
app.route('/', paymentRouter)
app.route('/', customerSupportTicketRouter)
app.route('/', fleetRouter)
app.route('/', authRouter)
app.route('/', stripeRouter)


const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
