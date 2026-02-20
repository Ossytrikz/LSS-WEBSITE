import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'api', 'data.json');

function readData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      resources: [],
      executives: [],
      alumni: [],
      merch: [],
      news: []
    };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}

function getNextId(items) {
  if (items.length === 0) return 1;
  return Math.max(...items.map(item => item.id)) + 1;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { type, id } = req.query;
    const data = readData();

    if (req.method === 'GET') {
      if (type && data[type]) {
        res.status(200).json(data[type]);
      } else {
        res.status(200).json(data);
      }
    } 
    else if (req.method === 'POST') {
      if (!type || !data[type]) {
        return res.status(400).json({ error: 'Invalid type' });
      }

      const newItem = {
        id: getNextId(data[type]),
        ...req.body
      };

      data[type].push(newItem);
      
      if (writeData(data)) {
        res.status(201).json(newItem);
      } else {
        res.status(500).json({ error: 'Failed to save data' });
      }
    }
    else if (req.method === 'PUT') {
      if (!type || !data[type] || !id) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const itemIndex = data[type].findIndex(item => item.id === parseInt(id));
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }

      data[type][itemIndex] = { ...data[type][itemIndex], ...req.body };
      
      if (writeData(data)) {
        res.status(200).json(data[type][itemIndex]);
      } else {
        res.status(500).json({ error: 'Failed to save data' });
      }
    }
    else if (req.method === 'DELETE') {
      if (!type || !data[type] || !id) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const itemIndex = data[type].findIndex(item => item.id === parseInt(id));
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }

      data[type].splice(itemIndex, 1);
      
      if (writeData(data)) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Failed to save data' });
      }
    }
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
