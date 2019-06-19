# Configuration Keys
This directory contains various '*.config.js' files which contain associated
configuration properties, paths, and api keys. These should not be checked in
to source control so as to avoid potential security risks.

---

## api.config.js
Configuration for interfacing with the NodeFS API.

*Example configuration:*
```javascript
export const API_CONFIG = {
	baseUrl: ""		//Base URL to API. Should be set to local dev environment while testing and eventual real URL when hosted somewhere.
};
```
