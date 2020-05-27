//import axios
import axios from 'axios';

//import alert
import { showAlert } from './alert';

const stripe = Stripe('pk_test_a1b9Fzfq0cE6OkJPZ7Pu4XnD00fCRVyX1f');

export const bookTour = async tourId => {
    try {
        //1) Get checkout session from our API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        //console.log(session);

        //2) create checkout form + change credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })


    } catch (err) {
        // console.log(err);
        showAlert('error', err);
    }
}