"use strict";
const { required } = require("../../../lib/utils");
const { Model } = require("mongoose");

const create = (Model) => async ({ data = required("data"), populate }) => {
  const item = new Model(data);
  let doc = await item.save();
  if (populate) {
    doc = await doc.populate(populate).execPopulate();
  }
  return doc.toObject();
};

const findOne = (Model) => async ({ query = required("query"), populate }) => {
  const doc = Model.findOne(query);
  if (populate) {
    doc.populate(populate);
  }

  const item = await doc.exec();
  return item ? item.toObject() : item;
};

const find = (Model) => async ({ query = required("query"), populate }) => {
  const doc = Model.find(query);
  if (populate) {
    doc.populate(populate);
  }

 return doc.lean().exec();

};

const findAll = (Model) => async ({ populate }) => {
    const doc = Model.find();
    if (populate) {
      doc.populate(populate);
    }
  
    const item = await doc.exec();
    return item ? item.toObject() : item;
  };
/**
 *
 * Create base model
 */
const BaseModel = (Model) => {
  return {
    /**
     * Create new item
     */
    create: create(Model),
    /**
     * Get one
     */
    get: findOne(Model),
    /**
     * Find a document
     */
    find: find(Model),
    /**
     * find all document
     */
    findAll:findAll(Model)
  };
};

module.exports = BaseModel;
