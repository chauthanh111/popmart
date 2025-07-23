import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    saleDate: '',
    session: '',
    fullName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    phoneNumber: '',
    email: '',
    idCard: '',
    agreedTerms: false,
    captchaInput: ''
  })

  const [captcha, setCaptcha] = useState('')
  const [errors, setErrors] = useState({})

  // Tạo captcha ngẫu nhiên
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha(result)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.saleDate) newErrors.saleDate = 'Vui lòng chọn ngày bán hàng'
    if (!formData.session) newErrors.session = 'Vui lòng chọn phiên'
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên'
    if (!formData.birthDay) newErrors.birthDay = 'Vui lòng nhập ngày sinh'
    if (!formData.birthMonth) newErrors.birthMonth = 'Vui lòng nhập tháng sinh'
    if (!formData.birthYear) newErrors.birthYear = 'Vui lòng nhập năm sinh'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Vui lòng nhập số điện thoại'
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email'
    if (!formData.idCard.trim()) newErrors.idCard = 'Vui lòng nhập CCCD/Hộ chiếu'
    if (!formData.agreedTerms) newErrors.agreedTerms = 'Vui lòng đồng ý với điều khoản'
    if (!formData.captchaInput.trim()) newErrors.captchaInput = 'Vui lòng nhập captcha'
    else if (formData.captchaInput !== captcha) newErrors.captchaInput = 'Captcha không đúng'

    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    // Validate phone number
    if (formData.phoneNumber && !/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      alert('Đăng ký thành công!')
      console.log('Form data:', formData)
      // Reset form
      setFormData({
        saleDate: '',
        session: '',
        fullName: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        phoneNumber: '',
        email: '',
        idCard: '',
        agreedTerms: false,
        captchaInput: ''
      })
      generateCaptcha()
    }
  }

  return (
    <div className="form-container">
      <div className="pop-mart-header">
        POP MART
      </div>
      
      <div className="form-content">
        <h2 className="form-title">ĐĂNG KÝ THAM GIA</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Sales date (Ngày bán hàng)</label>
            <select 
              name="saleDate" 
              value={formData.saleDate}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">-- Chọn --</option>
              <option value="2025-07-24">24/07/2025</option>
              <option value="2025-07-25">25/07/2025</option>
              <option value="2025-07-26">26/07/2025</option>
              <option value="2025-07-27">27/07/2025</option>
            </select>
            {errors.saleDate && <div className="error">{errors.saleDate}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Session (Phiên)</label>
            <select 
              name="session" 
              value={formData.session}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">-- Chọn phiên --</option>
              <option value="morning">Buổi sáng (9:00 - 12:00)</option>
              <option value="afternoon">Buổi chiều (13:00 - 17:00)</option>
          
            </select>
            {errors.session && <div className="error">{errors.session}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Full name (Họ tên)</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập họ và tên đầy đủ"
            />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Date of birth (Ngày Sinh)</label>
            <div className="date-group">
              <input 
                type="text" 
                name="birthDay"
                value={formData.birthDay}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ngày"
              />
              <input 
                type="text" 
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Tháng"
              />
              <input 
                type="text" 
                name="birthYear"
                value={formData.birthYear}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Năm"
              />
            </div>
            {(errors.birthDay || errors.birthMonth || errors.birthYear) && 
              <div className="error">Vui lòng nhập đầy đủ ngày tháng năm sinh</div>
            }
          </div>

          <div className="form-group">
            <label className="form-label">Phone number (Số điện thoại)</label>
            <input 
              type="text" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập số điện thoại"
            />
            {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập địa chỉ email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">ID Card/Passport (CCCD/Hộ chiếu)</label>
            <input 
              type="text" 
              name="idCard"
              value={formData.idCard}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập số CCCD hoặc hộ chiếu"
            />
            {errors.idCard && <div className="error">{errors.idCard}</div>}
          </div>

          <div className="checkbox-group">
            <input 
              type="checkbox" 
              name="agreedTerms"
              checked={formData.agreedTerms}
              onChange={handleInputChange}
              className="checkbox"
              id="terms"
            />
            <label htmlFor="terms" className="checkbox-label">
              Tôi đã đọc và đồng ý với <a href="#" target="_blank">Thể lệ chương trình</a><br/>
              I have read and agree to the <a href="#" target="_blank">Event Terms & Conditions</a>
            </label>
          </div>
          {errors.agreedTerms && <div className="error">{errors.agreedTerms}</div>}

          <div className="form-group">
            <label className="form-label">Captcha</label>
            <div className="captcha-group">
              <div className="captcha-display">{captcha}</div>
              <button 
                type="button" 
                onClick={generateCaptcha}
                className="refresh-btn"
                title="Làm mới captcha"
              >
                ↻
              </button>
              <input 
                type="text" 
                name="captchaInput"
                value={formData.captchaInput}
                onChange={handleInputChange}
                className="captcha-input"
                placeholder="Nhập captcha"
              />
            </div>
            {errors.captchaInput && <div className="error">{errors.captchaInput}</div>}
          </div>

          <button type="submit" className="submit-btn">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
