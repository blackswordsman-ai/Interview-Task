import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarNavigation = () => {
  const [expandedMenus, setExpandedMenus] = useState({
    'Financial MIS Reports': true,
    'Clinical MIS Reports': false,
    'Revenue MIS Reports': false,
    'Operational MIS Reports': false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    {
      title: 'Primary Menu',
      icon: '🏠',
      isMain: true,
      link: '/' 
    },
    {
      title: 'Financial MIS Reports',
      icon: '💰',
      subMenus: [
        { name: 'Bill Transaction Report', link: '/billTransaction' },
        { name: 'Billing Statement', link: '/billingStatement' },
        { name: 'Client Advance Report', link: '/clientAdvance' },
        { name: 'Client Billing Collection', link: '/clientBillingCollection' },
        { name: 'Client Portal Registration MIS', link: '/financial/client-portal' },
        { name: 'Client Transaction Details', link: '/clientTransaction' },
        { name: 'Collection MIS Reports', link: '/misReport' },
        { name: 'Sales Summary Report', link: '/financial/sales-summary' },
        { name: 'Service Wise Transaction MIS', link: '/financial/service-transaction' },
        { name: 'Transaction Details MIS Report', link: '/financial/transaction-details' }
      ]
    },
    {
      title: 'Clinical MIS Reports',
      icon: '🩺',
      subMenus: []
    },
    {
      title: 'Revenue MIS Reports',
      icon: '📈',
      subMenus: []
    },
    {
      title: 'Operational MIS Reports',
      icon: '⚙️',
      subMenus: []
    }
  ];

  return (
    <div style={{ width: '300px', height: '100vh', backgroundColor: '#0f2d44', color: 'white', fontFamily: 'Arial, sans-serif', overflow: 'auto' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '4px', padding: '3px 6px', fontSize: '12px', fontWeight: 'bold', color: '#0f2d44' }}>Diagnostics</div>
      </div>
      
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: item.isMain ? '#081c2c' : 'transparent' }} onClick={() => !item.isMain && toggleMenu(item.title)}>
            <span style={{ marginRight: '10px', fontSize: '16px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
            {item.isMain ? <Link to={item.link} style={{ flex: 1, fontSize: '14px', color: 'white', textDecoration: 'none' }}>{item.title}</Link> : <span style={{ flex: 1, fontSize: '14px' }}>{item.title}</span>}
            {!item.isMain && item.subMenus.length > 0 && <span style={{ fontSize: '12px' }}>{expandedMenus[item.title] ? '▼' : '▶'}</span>}
          </div>
          
          {item.subMenus?.length > 0 && expandedMenus[item.title] && (
  <div style={{ backgroundColor: '#11354e' }}>
    {item.subMenus.map((subItem, subIndex) => (
      <Link key={subIndex} to={subItem.link} style={{ display: 'block', padding: '10px 15px 10px 45px', fontSize: '13px', color: 'white', textDecoration: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        {subItem.name}
      </Link>
    ))}
  </div>
)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SidebarNavigation;