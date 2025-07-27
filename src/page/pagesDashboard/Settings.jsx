import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import db from '../../firebaseconfig';
import SideBar from '../../Components/sideBar';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../Redux/CurrentUser';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiInfo, FiBook } from 'react-icons/fi';

function Settings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    address: '',
    bio: '',
    city: '',
    university: '',
    status: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // Load current user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserData(currentUser);
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        phonenumber: currentUser.phonenumber || '',
        address: currentUser.address || '',
        bio: currentUser.bio || '',
        city: currentUser.city || '',
        university: currentUser.university || '',
        status: currentUser.status || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Find the user document in Firestore
      const q = query(collection(db, "user"), where("UserId", "==", userData.UserId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDocRef = doc(db, "user", querySnapshot.docs[0].id);
        
        // Update the user document with form data
        await updateDoc(userDocRef, {
          username: formData.username,
          email: formData.email,
          phonenumber: formData.phonenumber,
          address: formData.address,
          bio: formData.bio,
          city: formData.city,
          university: formData.university,
          status: formData.status
        });

        // Update the user data in localStorage and Redux
        const updatedUserData = {
          ...userData,
          ...formData
        };
        
        localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
        dispatch(setCurrentUser(updatedUserData));
        setUserData(updatedUserData);
        
        setSuccess('تم تحديث المعلومات بنجاح');
      } else {
        setError('لم يتم العثور على بيانات المستخدم');
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setError('حدث خطأ أثناء تحديث البيانات');
    }
    
    setLoading(false);
  };

  return (
    <div className="dashboard-app-container">
      <SideBar />
      
      <main className="dashboard-main-content">
        <header className="dashboard-navbar">
          <h1>إعدادات المستخدم</h1>
          <div className="navbar-actions">
            <div className="user-profile">
              <img 
                src={userData?.PhotoUrl || "https://via.placeholder.com/100"} 
                alt="User" 
                className="profile-avatar" 
              />
              <span className="profile-name">{userData?.username || "User"}</span>
            </div>
          </div>
        </header>
        
        <Container className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">تحديث معلومات المستخدم</h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FiUser className="me-2" /> اسم المستخدم
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FiMail className="me-2" /> البريد الإلكتروني
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FiPhone className="me-2" /> رقم الهاتف
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="phonenumber"
                          value={formData.phonenumber}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FiMapPin className="me-2" /> المدينة
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FiMapPin className="me-2" /> العنوان
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FiBook className="me-2" /> الجامعة
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FiInfo className="me-2" /> نبذة شخصية
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>الحالة</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="publisher">ناشر</option>
                      <option value="viewer">مشاهد</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <div className="d-flex justify-content-end">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={loading}
                      className="px-4"
                    >
                      {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Container>
      </main>

      <style jsx>{`
        .dashboard-app-container {
          display: flex;
          min-height: 100vh;
        }
        
        .dashboard-main-content {
          flex: 1;
          margin-left: 260px;
          padding: 20px;
          background-color: #f8f9fa;
        }
        
        .dashboard-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }
        
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .profile-name {
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .dashboard-main-content {
            margin-left: 80px;
          }
        }
      `}</style>
    </div>
  );
}

export default Settings;
