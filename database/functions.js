import { supabase } from "./supabaseClient";



async function getUser(userID) {
    const {
        data,
        error
    } = await supabase
        .from('users')
        .select('*')
        .eq('userID', userID);

    return {
        data,
        error
    };
}

async function getUsersWithDuePayment() {
    const {
        data,
        error
    } = await supabase
        .from('users')
        .select('*')
        .gt('pendingWithdrawalBalance', 0)



    return {
        data,
        error
    };
}

async function upsertUser(userID, email, balance, pendingWithdrawalBalance) {

    const {
        data,
        error
    } = await supabase
        .from('users')
        .upsert([{ userID, email, balance, pendingWithdrawalBalance }])

    return {
        data,
        error
    }
}

async function getPaymentMethods(userID) {
    let {
        data, error
    } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('userID', userID);

    if (data && data.length !== 0) data = data[0];
    else data = null;
    return {
        data,
        error
    };
}

async function createPaymentMethodsOfUser(userID, fullName, bankAccount, cardNumber, bkashNumber, bankName) {

    const {
        data,
        error
    } = await supabase
        .from('payment_methods')
        .insert([{ userID, fullName, bankAccount, cardNumber, bkashNumber, bankName }])

    return {
        data,
        error
    }
}


async function updatePaymentMethodsOfUser(userID, fullName, bankAccount, cardNumber, bkashNumber, bankName) {

    const {
        data,
        error
    } = await supabase
        .from('payment_methods')
        .update([{ fullName, bankAccount, cardNumber, bkashNumber, bankName }])
        .eq("userID", userID)

    return {
        data,
        error
    }
}


export {
    getUser,
    upsertUser,
    getUsersWithDuePayment,


    createPaymentMethodsOfUser,
    getPaymentMethods,
    updatePaymentMethodsOfUser,
}