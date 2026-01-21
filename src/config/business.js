/**
 * Business Configuration
 * Centralized business information that can be customized for different companies
 */

function getBusinessConfig() {
  const config = {
    // Business name - MUST come from environment variable
    name: process.env.BUSINESS_NAME || 'Your Pizza Company',
    
    // Business greeting - custom greeting or auto-generated from name
    greeting: process.env.BUSINESS_GREETING || `Welcome to ${process.env.BUSINESS_NAME || 'Your Pizza Company'}. How can I help you today?`,
    
    // Business location - can be overridden via environment variable
    location: process.env.BUSINESS_LOCATION || 'Your City, State',
    
    // Tax rate (default 8%)
    taxRate: parseFloat(process.env.TAX_RATE || '0.08'),
    
    // Phone number format (optional)
    phoneNumber: process.env.BUSINESS_PHONE || null
  };
  
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/568a64c9-92ee-463b-a9e1-63b6aaa39ebb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'business.js:getBusinessConfig',message:'CONFIG_LOADED',data:{envBusinessName:process.env.BUSINESS_NAME,envBusinessGreeting:process.env.BUSINESS_GREETING,resolvedName:config.name,resolvedGreeting:config.greeting},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B_config_loading'})}).catch(()=>{});
  // #endregion
  
  return config;
}

/**
 * Get business greeting
 */
function getBusinessGreeting() {
  return getBusinessConfig().greeting;
}

/**
 * Get business name
 */
function getBusinessName() {
  return getBusinessConfig().name;
}

/**
 * Get business location
 */
function getBusinessLocation() {
  return getBusinessConfig().location;
}

/**
 * Get tax rate
 */
function getTaxRate() {
  return getBusinessConfig().taxRate;
}

module.exports = {
  getBusinessConfig,
  getBusinessName,
  getBusinessGreeting,
  getBusinessLocation,
  getTaxRate
};

