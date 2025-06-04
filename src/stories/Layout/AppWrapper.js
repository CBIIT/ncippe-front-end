import React, {useEffect} from 'react'
import { CssBaseline, ThemeProvider, StyledEngineProvider  } from '@mui/material'

// importing i18n here to be bundled with the app code
import '../../i18n'
import { useTranslation } from 'react-i18next'
import { theme } from '../../theme/theme'

// global variable for determining if a user has logged in or not. Will be toggled by SignInCallback
window.$role = 'Public'

/**
 * The main app wrapper with analytics tracking removed
 */
const App = (props) => {
  const { i18n } = useTranslation()

  useEffect(() => {
    if(props.lang !== i18n.language) {
      i18n.changeLanguage(props.lang)
    }
  },[props.lang, i18n])

  return (
    <StyledEngineProvider injectFirst>
      (<ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="siteWrapper"> {/* returning a fragment here does not work in ie11 */}
          <div id="main" sx={{ flex: '1 0 auto', margin: '0', }} role="main">
            {props.children}
          </div>
        </div>
      </ThemeProvider>)
    </StyledEngineProvider>
  );
}

export default App