import Company from "../models/company.js";

export const createCompany = async (req, res) => {
  let newCompany = new Company(req.body.company);
  newCompany
    .save()
    .then((company) => company.setLatestPrice())
    .then((company) => res.status(200).json(company))
    .catch((error) => res.status(404).json(error));
};

export const getCompanies = async (req, res) => {
  Company.find()
    .sort("name")
    .then((companies) => res.status(200).json(companies))
    .catch((error) => {
      res.status(440).json(`Error Grabbing Companies! ${error}`);
    });
};

export const findCompany = async (req, res) => {
  Company.find({ _id: req.params.id })
    .then((company) => res.status(200).json(company))
    .catch((error) => {
      res.status(404).json(`Error Grabbing Companies! ${error}`);
    });
};

export const updateCompanies = async (req, res) => {
  Company.updateOne({ _id: req.params.id }, res.body.company)
    .then((company) => res.status(200).json(company))
    .catch((error) => res.status(404).json(error));
};

export const destroyCompanies = async (req, res) => {
  Company.removeDependancies(req.params.id);
  Company.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json(`Sucessfully Deleted Company!`))
    .catch((error) => {
      res.status(404).json(error);
    });
};

export const listCompanies = async (req, res) => {
  Company.find({})
    .sort("name")
    .then((companies) => {
      let result = {};
      for (let i = 0; i < companies.length; i++) {
        let company = companies[i];
        result[company.name] = company._id;
      }
      return res.json(result);
    })
    .catch((err) => res.status(404).json(`Error Grabbing Companies! ${err}`));
};
