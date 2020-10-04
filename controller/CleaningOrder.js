const COModel = require('../models/CleaningOrderModel')
const mongoose = require('mongoose')

class CleaningOrder {
    constructor(){
    }

    async getCurrentCleaning(){
        
        let currentCleaning = await COModel.findOne({active:true}, (err, data) => {
            if (err) {
                return err
            }            
            return data
        })        
        return currentCleaning
    }
}
module.exports = CleaningOrder