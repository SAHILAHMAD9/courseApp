const {username , password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(400).json({ message: 'Admin already exists' });
    } else {
      const obj = {username : username, password : password};
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({username, role : 'admin' }, SECRET , {expiresIn:'1h'})
      res.status().json({message:'Admin created successfull',token});
    }
  }
  Admin.findOne({ username }).then(callback);



  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
    


    const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }