import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role, deviceId } = req.body;
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User exists' });

    const user = await User.create({
      name,
      email,
      password: hashPassword(password),
      role,
      deviceId
    });

    res.status(201).json({ message: 'Registration successful. Wait for device verification.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, deviceId } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!comparePassword(password, user.password)) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (user.deviceId !== deviceId) {
      return res.status(403).json({ message: 'Device not recognized' });
    }

    if (!user.isDeviceVerified) {
      return res.status(403).json({ message: 'Device not verified by admin' });
    }

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
