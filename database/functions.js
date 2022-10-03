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


export {
    getUser,
    upsertUser
}