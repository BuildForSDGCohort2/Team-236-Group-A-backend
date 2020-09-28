"use strict"
const { model } = require("mongoose")
const addDisease = require("./add-disease")
const getAllDiseases = require("./get-all-diseasesl")
const getDiseaseByName = require("./get-disease-by-name")
const updateDisease = require("./update-disease")
const deleteDisease = require("./delete-disease")

module.exports = {
    addDisease,
    getAllDiseases,
    getDiseaseByName,
    updateDisease,
    deleteDisease
}