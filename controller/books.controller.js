const db = require("../model/psql");
const Books = db.books;
const { logger } = require("../winstonLogger");

const { Op } = require("sequelize");
const {
  handleInternalServerError,
  handleForbiddenError,
  handleUnauthorizedError,
  handleNotFoundError,
} = require("../utils/customError.handler");

let acceptedOptionalFilters = ["genre", "isbn", "availability", "bookId"];

const fetchAllBooks = async (req, res) => {
  try {
    const query = {};
    const filters = req.query;
    let searchText = req.query.searchTxt;
    let size = filters.size || 10;
    let page = filters.page || 1;

    let fromDate, toDate;
    let order = [["createdAt", "DESC"]];

    if (filters?.order) {
      filters.order = filters.order.replace(/'/g, '"');
      order = JSON.parse(filters.order) || [];
    }

    for (const key of acceptedOptionalFilters) {
      if (filters[key]) {
        query[key] = filters[key];
      }
    }

    if (searchText) {
      searchText = searchText.trim();
      query[Op.or] = [
        {
          title: { [Op.iLike]: `%${searchText}%` },
        },
        {
          author: { [Op.iLike]: `%${searchText}%` },
        },
      ];
    }

    if (filters.fromDate) {
      filters.fromDate = parseInt(filters.fromDate);
      fromDate = new Date(filters.fromDate);
    }
    if (filters.toDate) {
      filters.toDate = parseInt(filters.toDate);
      toDate = new Date(filters.toDate);
    }
    if (fromDate && toDate) {
        query['publishedDate'] = { [Op.gte]: fromDate, [Op.lte]: toDate }
    } else if (fromDate) {
        query['publishedDate'] = { [Op.gte]: fromDate }
    } else if (toDate) {
        query['publishedDate'] = { [Op.lte]: toDate }
    }

    const books = await Books.findAll({
      where: query,
      offset: (page - 1) * size,
      limit: size,
      order: order,
    });

    logger.debug('Successfully retrived the books for the given query');
    return res.status(200).json(books);
  } catch (error) {
    logger.error(error.stack);
    return res.status(500).json({ error: "Unable to fetch Books" });
  }
};

module.exports = {
  fetchAllBooks,
};
