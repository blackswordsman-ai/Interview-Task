import React from 'react';

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const styles = {
    header: {
      backgroundColor: '#0f2d44',
      color: 'white',
      padding: '8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center'
    },
    logoBox: {
      backgroundColor: 'white',
      color: '#0f2d44',
      padding: '4px 8px',
      borderRadius: '4px',
      marginRight: '8px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    notificationBadge: {
      backgroundColor: '#ff4444',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      marginRight: '8px'
    },
    userBox: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#11354e',
      borderRadius: '4px',
      padding: '4px 8px',
      color: 'white'
    },
    hamburgerIcon: {
      fontSize: '20px',
      marginRight: '10px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        <span 
          style={styles.hamburgerIcon} 
          onClick={() => setShowSidebar(!showSidebar)}
        >
          ☰
        </span>
        <div style={styles.logoBox}>Diagnostics</div>
        <span style={{fontWeight: '500'}}>Oncolab Diagnostics LLC</span>
      </div>
      <div style={styles.headerRight}>
        <div style={{marginRight: '8px'}}>ACCOUNTS1 / RIDER TRACKING</div>
        <div style={styles.notificationBadge}>1</div>
        <div style={{marginRight: '8px'}}>📣</div>
        <div style={styles.userBox}>
          <span style={{fontWeight: '500'}}>THOMAS</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;