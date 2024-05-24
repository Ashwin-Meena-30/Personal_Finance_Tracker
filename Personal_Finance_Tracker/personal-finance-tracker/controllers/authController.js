const { register, login } = require("../services/authService");

async function registerUser(req, res) {
  try {
    const user = await register(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { registerUser, loginUser };
