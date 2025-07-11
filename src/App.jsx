import './App.css'
import { useState, useEffect } from 'react'
import { ShoppingCart, User, Menu, X, Star, Heart, Search, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import brasilAppleLogo from './assets/brasil-apple-logo.png'

// API Configuration
const API_BASE_URL = 'https://60h5imceodnn.manus.space/api'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState('')

  // Load products on mount
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const addToCart = (product, color) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.color === color)
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, color, quantity: 1 }]
    })
  }

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2">
            <img src={brasilAppleLogo} alt="Brasil Apple" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">Brasil Apple</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-green-600 transition-colors">Início</button>
            <button onClick={() => setCurrentPage('products')} className="text-gray-700 hover:text-green-600 transition-colors">Produtos</button>
            <button onClick={() => setCurrentPage('about')} className="text-gray-700 hover:text-green-600 transition-colors">Sobre</button>
            <button onClick={() => setCurrentPage('contact')} className="text-gray-700 hover:text-green-600 transition-colors">Contato</button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button onClick={() => setCurrentPage('cart')} className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Olá, {user.name}</span>
                <button
                  onClick={() => setUser(null)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={() => setCurrentPage('login')} className="text-sm text-gray-700 hover:text-green-600">Entrar</button>
                <button onClick={() => setCurrentPage('register')} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                  Cadastrar
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="py-2 text-gray-700 hover:text-green-600 text-left">Início</button>
              <button onClick={() => { setCurrentPage('products'); setIsMenuOpen(false); }} className="py-2 text-gray-700 hover:text-green-600 text-left">Produtos</button>
              <button onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }} className="py-2 text-gray-700 hover:text-green-600 text-left">Sobre</button>
              <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="py-2 text-gray-700 hover:text-green-600 text-left">Contato</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={brasilAppleLogo} alt="Brasil Apple" className="h-8 w-8" />
              <span className="text-xl font-bold">Brasil Apple</span>
            </div>
            <p className="text-gray-400 mb-4">
              Tecnologia premium com qualidade Apple para o Brasil.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-white">Início</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="text-gray-400 hover:text-white">Produtos</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white">Sobre</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white">Contato</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">iPhone</span></li>
              <li><span className="text-gray-400">Mac</span></li>
              <li><span className="text-gray-400">iPad</span></li>
              <li><span className="text-gray-400">Apple Watch</span></li>
              <li><span className="text-gray-400">Acessórios</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">contato@brasilapple.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Brasil Apple. Todos os direitos reservados.
          </p>
          <div className="mt-2">
            <button onClick={() => setCurrentPage('admin')} className="text-gray-500 hover:text-gray-400 text-sm">Admin</button>
          </div>
        </div>
      </div>
    </footer>
  )

  // Product Card Component
  const ProductCard = ({ product }) => {
    const handleBuyNow = () => {
      setSelectedProduct(product)
      setSelectedColor(product.colors?.[0] || '')
      setShowBuyModal(true)
    }

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">📱</div>
              <div>Imagem não disponível</div>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          
          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cores disponíveis:</label>
              <div className="flex flex-wrap gap-1">
                {product.colors.map((color) => (
                  <span key={color} className="text-xs bg-gray-100 px-2 py-1 rounded">{color}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Buy Modal Component
  const BuyModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      number: '',
      city: '',
      state: '',
      zipCode: '',
    })

    const handleSubmit = async (e) => {
      e.preventDefault()
      
      try {
        const orderData = {
          product_id: selectedProduct.id,
          color: selectedColor,
          quantity: 1,
          customer_info: formData,
          total: selectedProduct.price,
        }

        const response = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        })

        if (response.ok) {
          alert('Pedido realizado com sucesso!')
          setShowBuyModal(false)
          addToCart(selectedProduct, selectedColor)
        } else {
          throw new Error('Erro ao processar pedido')
        }
      } catch (error) {
        alert('Erro ao processar pedido: ' + error.message)
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Finalizar Compra</h2>
              <button onClick={() => setShowBuyModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Product Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">{selectedProduct.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Cor: {selectedColor}</p>
              <p className="text-xl font-bold text-green-600">{formatPrice(selectedProduct.price)}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="CEP"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              {/* Address */}
              <input
                type="text"
                placeholder="Endereço"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Número"
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Estado"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              {/* Color Selection */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cor:</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    {selectedProduct.colors.map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBuyModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Finalizar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Page Components
  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Brasil Apple
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Tecnologia premium com a qualidade Apple que você conhece e confia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver Produtos
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ver Todos os Produtos
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher Brasil Apple?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualidade Premium</h3>
              <p className="text-gray-600">Produtos Apple originais com garantia oficial</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Entregamos em todo o Brasil com rapidez e segurança</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte Especializado</h3>
              <p className="text-gray-600">Equipe técnica especializada para te ajudar</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const ProductsPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Carregando produtos...</p>
          </div>
        )}
      </div>
    </div>
  )

  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Sobre a Brasil Apple</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
            <p className="text-gray-600 mb-4">
              A Brasil Apple nasceu da paixão pela tecnologia Apple e do desejo de tornar esses produtos 
              excepcionais mais acessíveis ao público brasileiro. Fundada em 2024, nossa empresa se dedica 
              a oferecer a melhor experiência de compra para produtos Apple no Brasil.
            </p>
            <p className="text-gray-600">
              Com uma equipe especializada e comprometida com a excelência, garantimos que cada cliente 
              receba não apenas um produto de qualidade superior, mas também um atendimento personalizado 
              e suporte técnico especializado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Nossa Missão</h3>
              <p className="text-gray-600">
                Democratizar o acesso à tecnologia Apple no Brasil, oferecendo produtos originais 
                com garantia oficial e o melhor atendimento ao cliente.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Nossa Visão</h3>
              <p className="text-gray-600">
                Ser a principal referência em produtos Apple no Brasil, reconhecida pela qualidade, 
                confiabilidade e inovação em nossos serviços.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Entre em Contato</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Assunto"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                  <textarea
                    placeholder="Sua mensagem"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold">Telefone</p>
                        <p className="text-gray-600">(11) 9999-9999</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold">E-mail</p>
                        <p className="text-gray-600">contato@brasilapple.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold">Endereço</p>
                        <p className="text-gray-600">São Paulo, SP - Brasil</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })

    const handleSubmit = async (e) => {
      e.preventDefault()
      
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setCurrentPage('home')
        } else {
          throw new Error('Credenciais inválidas')
        }
      } catch (error) {
        alert('Erro no login: ' + error.message)
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src={brasilAppleLogo} alt="Brasil Apple" className="mx-auto h-12 w-12" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Entrar na sua conta</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ou{' '}
              <button onClick={() => setCurrentPage('register')} className="font-medium text-green-600 hover:text-green-500">
                criar uma nova conta
              </button>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  const RegisterPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    })

    const handleSubmit = async (e) => {
      e.preventDefault()
      
      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem')
        return
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone
          }),
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setCurrentPage('home')
        } else {
          throw new Error('Erro ao criar conta')
        }
      } catch (error) {
        alert('Erro no cadastro: ' + error.message)
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src={brasilAppleLogo} alt="Brasil Apple" className="mx-auto h-12 w-12" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Criar nova conta</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ou{' '}
              <button onClick={() => setCurrentPage('login')} className="font-medium text-green-600 hover:text-green-500">
                entrar na sua conta existente
              </button>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              />
              <input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Criar conta
            </button>
          </form>
        </div>
      </div>
    )
  }

  const CartPage = () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    if (cart.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
              <p className="text-gray-600 mb-8">Adicione alguns produtos incríveis ao seu carrinho!</p>
              <button
                onClick={() => setCurrentPage('products')}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Ver Produtos
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Cor: {item.color}</p>
                      <p className="text-lg font-bold text-green-600">{formatPrice(item.price)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Quantidade</p>
                      <p className="font-semibold">{item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [newProduct, setNewProduct] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      image_url: '',
      stock: '',
      colors: []
    })
    const [selectedColors, setSelectedColors] = useState([])

    const availableColors = ['Azul', 'Branco', 'Rosa', 'Preto', 'Verde', 'Amarelo', 'Roxo', 'Vermelho']

    const handleLogin = (e) => {
      e.preventDefault()
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        setIsAuthenticated(true)
      } else {
        alert('Credenciais inválidas')
      }
    }

    const handleAddProduct = async (e) => {
      e.preventDefault()
      try {
        const productData = {
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          colors: selectedColors
        }
        
        const response = await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        })

        if (response.ok) {
          alert('Produto adicionado com sucesso!')
          setNewProduct({
            name: '',
            description: '',
            price: '',
            category: '',
            image_url: '',
            stock: '',
            colors: []
          })
          setSelectedColors([])
          loadProducts()
        } else {
          throw new Error('Erro ao adicionar produto')
        }
      } catch (error) {
        alert('Erro ao adicionar produto: ' + error.message)
      }
    }

    const toggleColor = (color) => {
      setSelectedColors(prev =>
        prev.includes(color)
          ? prev.filter(c => c !== color)
          : [...prev, color]
      )
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
              <p className="mt-2 text-sm text-gray-600">
                Username: admin | Password: admin123
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Product Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Adicionar Produto</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Descrição"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={3}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Preço"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Categoria"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
                <input
                  type="url"
                  placeholder="URL da imagem"
                  value={newProduct.image_url}
                  onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Estoque"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
                
                {/* Colors Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cores disponíveis:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableColors.map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => toggleColor(color)}
                          className="rounded"
                        />
                        <span className="text-sm">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Adicionar Produto
                </button>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Produtos Cadastrados</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {products.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatPrice(product.price)}
                    </p>
                    {product.colors && product.colors.length > 0 && (
                      <p className="text-sm text-gray-500">
                        Cores: {product.colors.join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">Estoque: {product.stock}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'products':
        return <ProductsPage />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      case 'login':
        return <LoginPage />
      case 'register':
        return <RegisterPage />
      case 'cart':
        return <CartPage />
      case 'admin':
        return <AdminPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
      
      {/* Buy Modal */}
      {showBuyModal && selectedProduct && <BuyModal />}
    </div>
  )
}

export default App

