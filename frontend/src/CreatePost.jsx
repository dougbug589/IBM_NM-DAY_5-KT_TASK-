import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function CreatePost({ user }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const characterLimit = 280;
  const remainingChars = characterLimit - content.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (content.trim().length === 0) {
      setError('Post cannot be empty');
      return;
    }

    if (content.length > characterLimit) {
      setError(`Post must be ${characterLimit} characters or less`);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/posts`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
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
        maxWidth: '700px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 0 10px 0'
          }}>
            Create Post
          </h2>
          <p style={{
            color: '#666',
            margin: 0
          }}>
            Share your thoughts with @{user?.username}
          </p>
        </div>

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
          <div style={{ marginBottom: '15px' }}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={characterLimit}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: '1.6',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              rows="6"
              onFocus={(e) => e.target.style.borderColor = '#a855f7'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px'
            }}>
              <span style={{
                fontSize: '14px',
                color: remainingChars < 20 ? '#ef4444' : '#999'
              }}>
                {remainingChars} characters remaining
              </span>
              <div style={{
                fontSize: '14px',
                color: '#999'
              }}>
                {content.length} / {characterLimit}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            <button
              type="submit"
              disabled={loading || content.trim().length === 0}
              style={{
                flex: 1,
                background: (loading || content.trim().length === 0) 
                  ? '#d1d5db' 
                  : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: 'white',
                fontWeight: '600',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '16px',
                cursor: (loading || content.trim().length === 0) ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 5px 15px rgba(168, 85, 247, 0.4)'
              }}
              onMouseOver={(e) => {
                if (!loading && content.trim().length > 0) {
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                flex: 1,
                background: '#f3f4f6',
                color: '#333',
                fontWeight: '600',
                padding: '15px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#e5e7eb'}
              onMouseOut={(e) => e.target.style.background = '#f3f4f6'}
            >
              Cancel
            </button>
          </div>
        </form>

        <div style={{
          marginTop: '25px',
          padding: '20px',
          background: '#faf5ff',
          borderRadius: '10px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#333',
            margin: '0 0 10px 0',
            fontWeight: '600'
          }}>
            Tips:
          </p>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#666',
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <li>Keep it short and sweet (max {characterLimit} characters)</li>
            <li>Be respectful and kind</li>
            <li>Share interesting thoughts or updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;