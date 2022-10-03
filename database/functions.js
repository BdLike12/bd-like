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

async function upsertUser(userID, email, balance) {

    const {
        data,
        error
    } = await supabase
        .from('users')
        .upsert([{ userID, email, balance }])

    return {
        data,
        error
    }
}

async function getPaymentMethods(userID) {
    const {
        data, error
    } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('userID', userID);

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
        .from('users')
        .update([{ fullName, bankAccount, cardNumber, bkashNumber, bankName}])
        .eq("userID", userID)

    return {
        data,
        error
    }
}


export {
    getUser,
    upsertUser,

    
    createPaymentMethodsOfUser,
    getPaymentMethods,
    updatePaymentMethodsOfUser,
}