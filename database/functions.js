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




async function getUsersThatWereRefferdByUser(referredBy) {
    const {
        data,
        error
    } = await supabase
        .from('users')
        .select('*')
        .eq('referredBy', referredBy)

    return {
        data,
        error
    };
}



async function upsertUser(userID, email, balance, pendingWithdrawalBalance, referredBy) {

    const {
        data,
        error
    } = await supabase
        .from('users')
        .upsert([{ userID, email, balance, pendingWithdrawalBalance, referredBy }])

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


async function insertAd(adID, type, link) {

    const {
        data,
        error
    } = await supabase
        .from('ads')
        .insert([{ adID, type, link }])

    return {
        data,
        error
    }
}


async function getAds() {
    const {
        data,
        error
    } = await supabase
        .from('ads')
        .select('*');

    return {
        data,
        error
    };
}

async function deleteAd(adID) {
    const {
        data,
        error
    } = await supabase
        .from('ads')
        .delete()
        .match({
            adID: adID
        });

    return {
        data,
        error
    };
}

async function addProveImage(filename, file) {

    // delete the image if there is already an image with the same filename
    const { data: deleteData, error: deleteError } = await supabase.storage.from('proofs').remove([filename])
    console.log("deleteData", deleteData);

    const { data,
        error
    } = await supabase.storage
        .from('proofs')
        .upload(filename, file);

    return { data, error }
}



async function insertTask(taskID, taskerID, secret, proof, link, status) {
    const {
        data,
        error
    } = await supabase
        .from('tasks')
        .insert([{ taskID, taskerID, secret, proof, link, status }])

    return {
        data,
        error
    }

}

async function getTasks(status) {
    let {
        data, error
    } = await supabase
        .from('tasks')
        .select('*')
        .eq('status', status);

    return {
        data,
        error
    }
}

async function getTasksOfUser(taskerID, status) {
    let {
        data, error
    } = await supabase
        .from('tasks')
        .select('*')
        .eq('taskerID', taskerID)
        .eq('status', status);

    return {
        data,
        error
    }
}


async function addProofOfTask(taskID, proof, status) {

    const {
        data,
        error
    } = await supabase
        .from('tasks')
        .update([{ proof, status }])
        .eq("taskID", taskID)

    return {
        data,
        error
    }
}

async function changeTaskStatus(taskID, status) {

    const {
        data,
        error
    } = await supabase
        .from('tasks')
        .update([{ status }])
        .eq("taskID", taskID)

    return {
        data,
        error
    }
}



async function insertHistory(historyID, userID, content) {

    let timestamp = Date.now();
    const {
        data,
        error
    } = await supabase
        .from('history')
        .insert([{ historyID, userID, content, timestamp }])

    return {
        data,
        error
    }
}

async function getUsersHistory(userID) {
    let {
        data, error
    } = await supabase
        .from('history')
        .select('*')
        .eq('userID', userID)

    return {
        data,
        error
    }
}




export {
    getUser,
    upsertUser,
    getUsersWithDuePayment,
    getUsersThatWereRefferdByUser,


    createPaymentMethodsOfUser,
    getPaymentMethods,
    updatePaymentMethodsOfUser,

    insertAd,
    getAds,
    deleteAd,

    addProveImage,

    insertTask,
    getTasks,
    addProofOfTask,
    changeTaskStatus,
    getTasksOfUser,

    insertHistory,
    getUsersHistory
}