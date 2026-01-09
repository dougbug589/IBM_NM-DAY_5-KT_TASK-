import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Prefer env override so we can point to deployed or local API easily.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Signup({ onLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                username,
                email,
                password
            });

            if (response.data.success) {
                onLogin(response.data.token, response.data.user);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                width: '100%',
                maxWidth: '450px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#333',
                    margin: '0 0 10px 0'
                }}>
                    Create Account
                </h2>
                <p style={{
                    textAlign: 'center',
                    color: '#666',
                    margin: '0 0 30px 0'
                }}>
                    Join our community today
                </p>

                {error && (
                    <div style={{
                        background: '#fef2f2',
                        border: '2px solid #ef4444',
                        color: '#991b1b',
                        padding: '15px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#333',
                            fontWeight: '600',
                            marginBottom: '8px',
                            fontSize: '14px'
                        }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength={3}
                            placeholder="johndoe"
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '10px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#333',
                            fontWeight: '600',
                            marginBottom: '8px',
                            fontSize: '14px'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your.email@example.com"
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '10px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{
                            display: 'block',
                            color: '#333',
                            fontWeight: '600',
                            marginBottom: '8px',
                            fontSize: '14px'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '10px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                        <p style={{
                            fontSize: '12px',
                            color: '#999',
                            margin: '6px 0 0 0'
                        }}>
                            Minimum 6 characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: loading ? '#d1d5db' : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                            color: 'white',
                            fontWeight: '600',
                            padding: '15px',
                            borderRadius: '10px',
                            border: 'none',
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'transform 0.2s',
                            boxShadow: '0 5px 15px rgba(168, 85, 247, 0.4)'
                        }}
                        onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div style={{
                    marginTop: '25px',
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: '#666',
                        margin: 0,
                        fontSize: '14px'
                    }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{
                            color: '#a855f7',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}>
                            Login
                        </Link>
                    </p>
                </div>

                <div style={{
                    marginTop: '15px',
                    textAlign: 'center'
                }}>
                    <Link to="/" style={{
                        color: '#999',
                        fontSize: '14px',
                        textDecoration: 'none'
                    }}>
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;