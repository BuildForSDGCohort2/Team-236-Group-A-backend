"use strict";
const { required } = require("../../../lib/utils");
const { Model } = require("mongoose");

const findOne = (Model) => async ({ query = required("query"), populate }) => {
  const doc = Model.findOne(query);
  if (populate) {
    doc.populate(populate);
  }

  const item = await doc.exec();
  return item ? item.toObject() : item;
};

const create = (Model) => async ({ data = required("data"), populate }) => {
  const item = new Model(data);
  let doc = await item.save();
  if (populate) {
    doc = await doc.populate(populate).execPopulate();
  }
  return doc.toObject();
};

const find = (Model) => async ({ query = required("query"), populate }) => {
  const doc = Model.find(query);
  if (populate) {
    doc.populate(populate);
  }

  const items = await doc.exec();
  return items.map((item) => item.toObject());
};

const findAll = (Model) => async ({ populate }) => {
  const doc = Model.find();
  if (populate) {
    await doc.populate(populate);
  }

  const items = await doc.exec();
  return items.map((item) => item.toObject());
};

const update = (Model) => async ({ query, data }) => {
  const doc = Model.findOneAndUpdate(query, data, {
    new: true,
  });

  const item = await doc.exec();
  return item ? item.toObject() : item;
};

const deleteOne = (Model) => async ({query}) =>{
  const doc = Model.deleteOne(query)
  return doc.exec()
}
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
    findAll: findAll(Model),

    /**
     * update a document
     */
    update: update(Model),
        /**
     * delete  a document
     */

    deleteOne:deleteOne(Model)
  };
};

module.exports = BaseModel;
