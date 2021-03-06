require('dotenv').config();

const Airtable = require('airtable');

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const base = Airtable.base(process.env.AIRTABLE_REACT_BASE_ID);
const table = base.table('tours');

exports.handler = async (event, context, callback) => {
  const response = await table.select({}).firstPage();
  const data = response.map((tour) => {
    const { name, info, image, price } = tour.fields;
    return { id: tour.id, name, info, image: image[0].url, price };
  });
  return (
    null,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(data),
    }
  );
};
