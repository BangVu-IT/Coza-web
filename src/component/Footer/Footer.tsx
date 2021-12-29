import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer/Footer.css';

export default function Footer() {
    return (
        <div>
            <footer>
                © Bản quyền thuộc về . Thiết kế website <img className="img" src="http://mona-media.com/logo.png" alt="" width={20} height={20} /> <Link to="#">Mona Media</Link>
            </footer>
        </div>
    )
}
