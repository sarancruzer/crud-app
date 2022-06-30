import React from 'react';

export const Header: React.FC = () => {
  return (
    <>
    <ul className="nav justify-content-end">
  <li className="nav-item">
    <a className="nav-link active" href="#">Active</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Link</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Link</a>
  </li>
  <li className="nav-item">
    <a className="nav-link disabled" href="#">Disabled</a>
  </li>
</ul>
    </>
  )
}
