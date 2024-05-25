
const getRecords = async (model,filter) => {
    try {
        const document = await model.findOne(filter);
        return document;

    } catch (error) {
        console.log("Error occured while querying",error);
    }
    
}

const createNewRecord = async (model,newRecord)  => {
    try {
        await model.create(newRecord);
        console.log("New Entry made in model: ");

    } catch (error) {
        console.log("Unable to create new entry",error);
    }
    
} 

const updateRecord = async (model,filter,updatedRecord) => {
    try {
        await model.findOneAndUpdate(filter,updatedRecord);
        console.log("Record updated in model");

    } catch (error) {
        console.log("An error occured while updating",error);
    }
}

const deleteRecord = async (model,record) => {
    try {
        await model.findOneAndDelete(record);
        console.log("Record deleted from model");

    } catch (error) {
        console.log("An error occured while deleting",error);
    }
}


module.exports = {getRecords, createNewRecord, updateRecord, deleteRecord};

