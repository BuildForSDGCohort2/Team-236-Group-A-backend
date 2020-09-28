"use strict";
const express = require("express");
const router = express.Router();
const { addDisease, getAllDiseases, getDiseaseByName, updateDisease, deleteDisease } = require("../../service/disease");
const { validate } = require("../../lib/utils");
const { addDiseaseSchema, getDiseaseByNameSchema, updateDiseaseSchema } = require("./schema");
router.post("/", async (req, res, next) => {
  try {
    const { name, description, remedy } = validate(addDiseaseSchema, req.body);
    const disease = await addDisease(name, description, remedy);
    return res.status(200).json({ data: disease });
  } catch (error) {
    next(error);
  }
});

router.get("/", async(req, res, next) => {
    try{
    const diseases = await getAllDiseases()
    return res.status(200).json({ data: diseases });
} catch (error) {
    next(error);
  }
});

router.get("/name/:name", async(req, res, next) => {
    try{
     const { name } = validate(getDiseaseByNameSchema, req.params);
    const disease = await getDiseaseByName(name)
    return res.status(200).json({ data: disease });
} catch (error) {
    next(error);
  }
});

router.put("/:diseaseId", async (req, res, next) => {
    try {
      const { name, description, remedy } = validate(updateDiseaseSchema, req.body);
      const disease = await updateDisease(req.params.diseaseId, req.body);
      return res.status(200).json({ data: disease });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:diseaseId", async (req, res, next)=>{
      try {
          await deleteDisease(req.params.diseaseId)
          return res.sendStatus(200)
      } catch (error) {
          next(error)
          
      }
  })

module.exports = router;
