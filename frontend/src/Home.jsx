import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Home({ isAuthenticated, user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      alert('Failed to delete post');
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#333',
                margin: '0 0 5px 0'
              }}>
                Social Media
              </h1>
              <p style={{
                color: '#666',
                margin: 0
              }}>
                Share your thoughts with the world
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center'
            }}>
              {isAuthenticated ? (
                <>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontWeight: 'bold',
                      color: '#333',
                      margin: '0 0 3px 0'
                    }}>
                      {user?.username}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: 0
                    }}>
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#dc2626'}
                    onMouseOut={(e) => e.target.style.background = '#ef4444'}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <button style={{
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <button style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Create Post Button */}
        {isAuthenticated && (
          <Link to="/create" style={{ textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: 'white',
              textAlign: 'center',
              padding: '20px',
              borderRadius: '15px',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              + Create New Post
            </div>
          </Link>
        )}

        {/* Posts Feed */}
        {loading ? (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              border: '4px solid #f3f4f6',
              borderTop: '4px solid #a855f7',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ color: '#666', margin: 0 }}>Loading posts...</p>
          </div>
        ) : error ? (
          <div style={{
            background: '#fef2f2',
            border: '2px solid #ef4444',
            color: '#991b1b',
            padding: '20px',
            borderRadius: '10px'
          }}>
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <p style={{
              fontSize: '18px',
              color: '#666',
              margin: 0
            }}>
              No posts yet. Be the first to post!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {posts.map(post => (
              <div key={post._id} style={{
                background: 'white',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div>
                    <p style={{
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: '#333',
                      margin: '0 0 5px 0'
                    }}>
                      @{post.authorUsername}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#999',
                      margin: 0
                    }}>
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                  
                  {isAuthenticated && user?.username === post.authorUsername && (
                    <button
                      onClick={() => handleDelete(post._id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '5px',
                        fontSize: '20px'
                      }}
                      title="Delete post"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                
                <p style={{
                  color: '#333',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Home;