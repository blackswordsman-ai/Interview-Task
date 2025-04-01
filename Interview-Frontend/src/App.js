import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SidebarNavigation from './components/SidebarNavigation';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const styles = {
    pageContainer: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#f0f8ff'
    },
    menuBar: {
      backgroundColor: '#0052a3',
      color: 'white',
      display: 'flex',
      borderTop: '1px solid #3380cc'
    },
    menuBarItem: {
      flex: 1,
      padding: '8px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRight: '1px solid #3380cc',
      cursor: 'pointer'
    },
    menuBarIcon: {
      fontSize: '18px',
      marginBottom: '4px'
    },
    menuBarText: {
      fontSize: '11px'
    },
    alertBar: {
      backgroundColor: '#e6f0ff',
      color: '#003366',
      padding: '4px 16px',
      textAlign: 'right',
      fontSize: '14px'
    },
    filterBar: {
      backgroundColor: '#e6e6e6',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid #cccccc',
      borderBottom: '1px solid #cccccc'
    },
    select: {
      border: '1px solid #cccccc',
      borderRadius: '4px',
      padding: '4px',
      width: '250px'
    },
    checkbox: {
      marginRight: '4px'
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#e6f7ff',
      padding: '16px'
    },
    footer: {
      backgroundColor: 'white',
      padding: '8px',
      fontSize: '12px',
      color: '#666666',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #cccccc'
    }
  };

  return (
    <div style={styles.pageContainer}>
      {showSidebar && <SidebarNavigation />}
      
      <div style={styles.container}>
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        
        {/* Menu Bar */}
        <div style={styles.menuBar}>
          {['➕', '📋', '🖨️', '📧', '🧹', '🔄', '📄', '⚙️', '❓', '✖️'].map((icon, index) => (
            <div key={index} style={styles.menuBarItem}>
              <span style={styles.menuBarIcon}>{icon}</span>
              <span style={styles.menuBarText}>
                {['Create', 'List', 'Print', 'Email', 'Clear', 'Refresh', 'Regulation', 'Settings', 'Help', 'Close'][index]}
              </span>
            </div>
          ))}
        </div>
        
        {/* Notification Bar */}
        <div style={styles.alertBar}>
          There is an outstanding payment and your last due date is 23-03-2025.
        </div>
        
        {/* Filter Bar */}
        <div style={styles.filterBar}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '8px'}}>Rider Name</span>
            <select style={styles.select}>
              <option value=""></option>
            </select>
          </div>
          <div style={{marginLeft: '32px', display: 'flex', alignItems: 'center'}}>
            <input 
              type="checkbox" 
              id="autoRefresh" 
              checked={autoRefresh} 
              onChange={() => setAutoRefresh(!autoRefresh)}
              style={styles.checkbox}
            />
            <label htmlFor="autoRefresh">Auto Refresh</label>
          </div>
          <div style={{marginLeft: 'auto'}}>
            <span style={{fontSize: '14px'}}>Seconds: 1</span>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div style={styles.mainContent}>
          {/* Empty content area */}
        </div>
        
        {/* Footer */}
        <div style={styles.footer}>
          <div>Copyright © 2024. All rights reserved to Caredaia Infomatics</div>
          <div>Please Call or WhatsApp for Support: +919000052472</div>
          <div>Version : 2.1.24</div>
        </div>
      </div>
    </div>
  );
};

export default App;