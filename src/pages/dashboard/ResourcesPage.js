import React, {useContext} from 'react'
import { Box, Container, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import { LoginContext } from '../../components/login/Login.context'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import RenderContent from '../../components/utils/RenderContent'

const useStyles = makeStyles(theme => ({
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  titleIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
  },
  resources: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%'
    }
  },
  resourceBlock: {
    '& h3': {
      marginBottom: theme.spacing(2)
    }
  },
  divider: {
    width: '100%',
    margin: theme.spacing(3,0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(5,0)
    }
  },
}),{name: 'ResourcesPage'})

const Page = () => {
  const classes = useStyles()
  const [loginContext] = useContext(LoginContext)
  const {roleName} = loginContext
  const contentForRole = roleName === "ROLE_PPE_PROVIDER" ? 'a_resources_provider' : 'a_resources_participant'
  const { t } = useTranslation([contentForRole,'a_common'])
  return (
    <Box className="popup">
      <Helmet>
        <title>{t('metaData.title')}</title>
        <meta name="title" content={t('metaData.title')} />
      </Helmet>
      <Breadcrumbs pageName="Resources" />
      <Container className="mainContainer">
        <div className={classes.titleWithIcon}>
          <img className={classes.titleIcon} src={`/${process.env.PUBLIC_URL}assets/icons/one-idea-v2.svg`} alt={t('a_common:icons.resources')} aria-hidden="true"></img>
          <Typography variant="h2" component="h2">{t('pageTitle')}</Typography>
        </div>
        <Typography>{t('description')} </Typography>
        <Box mt={5}>
          <div className={classes.resources}>
          {Object.keys(t('sections', { returnObjects: true })).map((section, i) => 
            <div key={i} className={classes.resourceBlock}>
              {i !== 0 && <Divider className={classes.divider} />}
              <Typography variant="h3" component="h3">
                <RenderContent source={t(`sections.${i}.title`)} />
              </Typography>
              <Typography component="div">
                <RenderContent source={t(`sections.${i}.body`)} />
              </Typography>
            </div>
          )}
          </div>
        </Box>
      </Container>
    </Box>
  )
}

export default Page