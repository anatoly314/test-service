import httpStatus from "http-status";

/**
 * Get user
 * @public
 */
//TODO resource need to be pulled from Kafka
export const get = (req, res) => res.json({
  id: 'uniq_id_here',
  test: 'test'
});

export const create = async (req, res, next) => {
  try {
    //TODO now resource need to be sent to Kafka
    const resource = req.body;
    res.status(httpStatus.CREATED);
    //TODO create function which will create resource according to requirements
    res.json({
      id: 'uniq_id_here',
      test: 'test',
      resource: resource
    });
  } catch (error) {
    next(error);
  }
};
