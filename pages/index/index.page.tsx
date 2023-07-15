import React from 'react';
import './style.css';

export { Page };

function Page() {
  return (
    <>
      <div className="landing-page">
        <header>
          <div className="container">
            <a href="#" className="logo">
              Yasmany <b>Dev</b>
            </a>
            <ul className="links">
              <li>
                <a
                  style={{ color: 'white' }}
                  target="_blank"
                  href="https://webtroniclabs.com"
                >
                  Get started
                </a>
              </li>
            </ul>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Looking For Inspiration</h1>
              <p>
                Ready to transform your online presence? Get started with our
                expert web development services now!"
              </p>
              <button>
                <a
                  style={{
                    color: 'white',
                    padding: '30px 50px',
                    fontSize: '30px',
                  }}
                  className="whitespace-nowrap"
                  target="_blank"
                  href="https://webtroniclabs.com"
                >
                  Get started
                </a>
              </button>
            </div>
            <div className="image">
              <img
                width="1026px"
                height="800px"
                alt="woman holding a location sign"
                src="https://i.postimg.cc/65QxYYzh/001234.png"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
