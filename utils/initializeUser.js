import { createPaymentMethodsOfUser, getUser, upsertUser } from "../database/functions";

async function initializeUser(user) {
    if (!user) return;

    let userID = user.sub;
    let email = user.email;
    let balance = 0.00;
    let { data, error } = await getUser(userID);
    if (!data || (data.length === 0))
    {
        await upsertUser(userID, email, balance);
        await createPaymentMethodsOfUser(userID, "", "", "", "", "");
    }
}

export { initializeUser }