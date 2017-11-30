// locations to search for config files that get merged into the main config;
// config files can be ConfigSlurper scripts, Java properties files, or classes
// in the classpath in ConfigSlurper format

// grails.config.locations = [ "classpath:${appName}-config.properties",
//                             "classpath:${appName}-config.groovy",
//                             "file:${userHome}/.grails/${appName}-config.properties",
//                             "file:${userHome}/.grails/${appName}-config.groovy"]

// if (System.properties["${appName}.config.location"]) {
//    grails.config.locations << "file:" + System.properties["${appName}.config.location"]
// }

/*EXTERNAL CONFIGURATION FOR SECURITY*/

/********************* CONFIG FILE START ******************************/
//import com.getsentry.raven.log4j.SentryAppender;
//import com.getsentry.raven.*;
import org.apache.log4j.Level
import portal.SentryAppender;

/* AVAILABLE VARIABLES PROVIDED BY GRAILS
userHome - Location of the home directory for the account that is running the Grails application.
grailsHome - Location of the directory where you installed Grails. If the GRAILS_HOME environment variable is set, it is used.
appName - The application name as it appears in application.properties.
appVersion - The application version as it appears in application.properties.
grailsApplication - The GrailsApplication instance.
*/

grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination

// The ACCEPT header will not be used for content negotiation for user agents containing the following strings (defaults to the 4 major rendering engines)
grails.mime.disable.accept.header.userAgents = ['Gecko', 'WebKit', 'Presto', 'Trident']
grails.mime.types = [ // the first one is the default format
    all:           '*/*', // 'all' maps to '*' or the first available format in withFormat
    atom:          'application/atom+xml',
    css:           'text/css',
    csv:           'text/csv',
    form:          'application/x-www-form-urlencoded',
    html:          ['text/html','application/xhtml+xml'],
    js:            'text/javascript',
    json:          ['application/json', 'text/json'],
    multipartForm: 'multipart/form-data',
    rss:           'application/rss+xml',
    text:          'text/plain',
    hal:           ['application/hal+json','application/hal+xml'],
    xml:           ['text/xml', 'application/xml']
]

// URL Mapping Cache Max Size, defaults to 5000
//grails.urlmapping.cache.maxsize = 1000

// Legacy setting for codec used to encode data with ${}
grails.views.default.codec = "html"

// The default scope for controllers. May be prototype, session or singleton.
// If unspecified, controllers are prototype scoped.
grails.controllers.defaultScope = 'singleton'

/*NEEIS CONFIGURATION VARIABLES */



grails.mysqlToAimTableMap =[
        //mysqlTable: AIMTable
        Coverages: "Coverage",
        Products: "Product",
        Company: "Company",
        Producer: "Producer",
        AimUser: "UserID",
        StatusCode: "Status",
        Operations: "ACP_Operations"
]

def appDirectory
def neeisTimeZone

environments {
    development {
        appDirectory = "/universe/Neeis/"
        neeisTimeZone = "America/Los_Angeles"

        grails.appDirectory = appDirectory
        grails.syncLogPath = appDirectory + "logs/sync.log"
        grails.logging.jul.usebridge = true
        grails.neeisTimeZone = neeisTimeZone

        grails.neeisEmail = "johnkimsinbox@gmail.com"
        neeisEmailPassword = "Perseverence12"


        //GET HOST NAME OF DEV ENVIRONMENT
        def hostName = "localhost";
        try {
            hostName = InetAddress.getLocalHost().getHostName()

            if(hostName == "localDevVagrant"){
                disable.auto.recompile=false
                grails.serverURL = "http://127.0.0.1:8080"
            }
            else{
                grails.serverURL = "http://104.236.23.128:8080"
            }
        }
        catch (Exception e) {
            println "ERROR CHECKING HOSTNAME (CONFIG.GROOVY)"
        }
        println "SERVER URL = ${grails.serverURL}"

    }
    production {
        appDirectory = "/universe/Neeis/"
        neeisTimeZone = "America/Los_Angeles"

        grails.appDirectory = appDirectory
        grails.syncLogPath = appDirectory + "logs/sync.log"
        grails.serverURL = "https://portal.neeisins.com"
        grails.logging.jul.usebridge = false
        grails.neeisTimeZone = neeisTimeZone
        grails.neeisEmail = ""
        grails.neeisEmailPassword = ""
    }
}

grails {
    //MAIL PLUGIN SETTINGS
    mail {
        host = "smtp.gmail.com"
        port = 465
        username = "noreplyneeis@gmail.com"
        password = "Perseverence!2"
        props = ["mail.smtp.auth":"true",
                 "mail.smtp.socketFactory.port":"465",
                 "mail.smtp.socketFactory.class":"javax.net.ssl.SSLSocketFactory",
                 "mail.smtp.socketFactory.fallback":"false"]
    }
    // GSP settings
    views {
        gsp {
            encoding = 'UTF-8'
            htmlcodec = 'xml' // use xml escaping instead of HTML4 escaping
            codecs {
                expression = 'html' // escapes values inside ${}
                scriptlet = 'html' // escapes output from scriptlets in GSPs
                taglib = 'none' // escapes output from taglibs
                staticparts = 'none' // escapes output from static template parts
            }
        }
        // escapes all not-encoded output at final stage of outputting
        // filteringCodecForContentType.'text/html' = 'html'
    }

}


grails.converters.encoding = "UTF-8"
// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'

// Set to false to use the new Grails 1.2 JSONBuilder in the render method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []
// whether to disable processing of multi part requests
grails.web.disable.multipart=false

// request parameters to mask when logging exceptions
grails.exceptionresolver.params.exclude = ['password']

// configure auto-caching of queries by default (if false you can cache individual queries with 'cache: true')
grails.hibernate.cache.queries = false

// configure passing transaction's read-only attribute to Hibernate session, queries and criterias
// set "singleSession = false" OSIV mode in hibernate configuration after enabling
grails.hibernate.pass.readonly = false
// configure passing read-only to OSIV session by default, requires "singleSession = false" OSIV mode
grails.hibernate.osiv.readonly = false




//LOG4J configuration
log4j.main = {
    // Example of changing the log pattern for the default console appender:
    //
    //appenders {
    //    console name:'stdout', layout:pattern(conversionPattern: '%c{2} %m%n')
    //}

    environments {
        development {
            appenders {
                file name: 'file', file: "${appDirectory}/logs/grails.log"
                appender new portal.SentryAppender(
                        name: "Sentry",
                        threshold: Level.WARN,
                        dsn: "https://dbc11c2801a349afb0be298fe227925e:69c31ee13b1e4f289de6c4cdf05b65eb@sentry.io/145737",
                        release: "1.0",
                        environment: "development")
            }
        }
        production {
            appenders {
                file name: 'file', file: "${appDirectory}/logs/grails.log"
                appender new portal.SentryAppender(
                        name: "Sentry",
                        threshold: Level.WARN,
                        dsn: "https://6ac7da9b8eba444fad37c91e68b560e0:2b75b2d200354e79bc82eb793c3c6bd4@sentry.io/145672",
                        release: "1.0",
                        environment: "production")
            }
        }
        localDev {
            appenders {
                file name: 'file', file: "${appDirectory}/logs/grails.log"
                appender new portal.SentryAppender(
                        name: "Sentry",
                        threshold: Level.WARN,
                        dsn: "https://6ac7da9b8eba444fad37c91e68b560e0:2b75b2d200354e79bc82eb793c3c6bd4@sentry.io/145672",
                        release: "1.0",
                        environment: "production")
            }
        }
    }



    info 'org.codehaus.groovy.grails.web.servlet',        // controllers
            'org.codehaus.groovy.grails.web.pages',          // GSP
            'org.codehaus.groovy.grails.web.sitemesh',       // layouts
            'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
            'org.codehaus.groovy.grails.web.mapping',        // URL mapping
            'org.codehaus.groovy.grails.commons',            // core / classloading
            'org.codehaus.groovy.grails.plugins',            // plugins
            'org.codehaus.groovy.grails.orm.hibernate',      // hibernate integration
            'org.springframework',
            'org.hibernate',
            'net.sf.ehcache.hibernate'


    root {
        info 'file', 'stdout', 'Sentry', 'grails.app', 'portal'
    }

}
//# Configure the Sentry appender, overriding the logging threshold to the WARN level
//log4j.appender.Sentry="com.getsentry.raven.log4j.SentryAppender"
//log4j.appender.Sentry.threshold="WARN"

beans {
    cacheManager {
        shared = true
    }
}
