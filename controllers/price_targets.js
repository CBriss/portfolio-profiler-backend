import PriceTarget from "../models/price_target.js";

export const createPriceTarget = async (req, res) => {
  let newPriceTarget = new PriceTarget(req.body.priceTarget);
  newPriceTarget
    .save()
    .then((priceTarget) => priceTarget.setLatestPrice())
    .then((priceTarget) => res.status(200).json(priceTarget))
    .catch((error) => res.status(404).json(error));
};

export const getPriceTargets = async (req, res) => {
  PriceTarget.find()
    .populate("company")
    .then((priceTargets) => res.status(200).json(priceTargets))
    .catch((error) => {
      res.status(440).json(`Error Grabbing PriceTargets! ${error}`);
    });
};

export const findPriceTarget = async (req, res) => {
  PriceTarget.find({ _id: req.params.id })
    .then((priceTarget) => res.status(200).json(priceTarget))
    .catch((error) => {
      res.status(404).json(`Error Grabbing PriceTargets! ${error}`);
    });
};

export const updatePriceTargets = async (req, res) => {
  PriceTarget.updateOne({ _id: req.params.id }, res.body.priceTarget)
    .then((priceTarget) => res.status(200).json(priceTarget))
    .catch((error) => res.status(404).json(error));
};

export const destroyPriceTargets = async (req, res) => {
  PriceTarget.removeDependancies(req.params.id);
  PriceTarget.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json(`Sucessfully Deleted PriceTarget!`))
    .catch((error) => {
      res.status(404).json(error);
    });
};
