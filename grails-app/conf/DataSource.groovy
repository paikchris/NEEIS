dataSource {
//    pooled = true
//    jmxExport = true
//    driverClassName = "org.h2.Driver"
//    username = "sa"
//    password = ""
    pooled = true
    driverClassName = "com.mysql.jdbc.Driver"
    dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
//    cache.region.factory_class = 'org.hibernate.cache.SingletonEhCacheRegionFactory' // Hibernate 3
    cache.region.factory_class = 'org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory'
//    cache.region.factory_class = 'org.hibernate.cache.ehcache.EhCacheRegionFactory' // Hibernate 4
    singleSession = true // configure OSIV singleSession mode
    flush.mode = 'manual' // OSIV session flush mode outside of transactional context
}


// environment specific settings
environments {
    development {

        //GET HOST NAME OF DEV ENVIRONMENT
        def hostName = "localhost";
        def mysqlURL = ""
        def aimsqlURL = ""
        def aimsqlUser = ""
        def aimsqlPassword = ""
        try {
            hostName = InetAddress.getLocalHost().getHostName()
            if(hostName == "localDevVagrant"){
                mysqlURL = "127.0.0.1"
                aimsqlURL = "127.0.0.1"
                aimsqlUser = "SA"
                aimsqlPassword = "jakePoos521"
            }
            else{
                mysqlURL = "104.236.23.128"
                aimsqlURL = "47.180.31.157"
                aimsqlUser = "web"
                aimsqlPassword = "jakePoos521"
            }
        } catch (Exception e) {
            println "ERROR CHECKING HOSTNAME (DATASOURCE.GROOVY)"
        }
        println "MYSQLURL = ${mysqlURL}"
        println "AIMSQLURL = ${aimsqlURL}"
        println "AIMSQL USER = ${aimsqlUser}"
        println "AIMSQL PASSWORD = ${aimsqlPassword}"

        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop', 'update', 'validate', ''
            url = "jdbc:mysql://${mysqlURL}/neeisPortal?useUnicode=yes&characterEncoding=UTF-8"
            username = "root"
            password = "Perseverence!2"
            logsql = true
        }
        dataSource_aim{
            dbCreate = "update"
            url = "jdbc:sqlserver://${aimsqlURL}:1433;databaseName=Training;"
            driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
            username = aimsqlUser
            password = aimsqlPassword
            logSql = true
        }
    }
    test {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop', 'update', 'validate', ''
            url = "jdbc:mysql://localhost/neeisPortal?useUnicode=yes&characterEncoding=UTF-8"
            username = "root"
            password = "Perseverence!2"
            logsql = true
            properties {
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            }
        }
        dataSource_aim{
            dbCreate = "update"
            url = "jdbc:sqlserver://47.180.31.157:1433;databaseName=Training"
            driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
            username = "web"
            password = "jakePoos521"
            logSql = true
            properties {
                maxActive = -1
                minEvictableIdleTimeMillis=1000 * 60 * 30
                timeBetweenEvictionRunsMillis=1000 * 60 * 30
                numTestsPerEvictionRun=3
                testOnBorrow=true
                testWhileIdle=true
                testOnReturn=true
                validationQuery="SELECT 1"
                jdbcInterceptors="ConnectionState;StatementCache(max=200)"
            }
        }
    }
    production {
        dataSource {
            dbCreate = "update"
            url = "jdbc:mysql://localhost/neeisPortal?useUnicode=yes&characterEncoding=UTF-8"
            username = "root"
            password = "Perseverence!2"
            properties {
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            }

        }

        dataSource_aim{
            dbCreate = "update"
            url = "jdbc:sqlserver://47.180.31.157:1433;databaseName=CIS"
            driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
            username = "web"
            password = "jakePoos521"
            properties {
                maxActive = -1
                minEvictableIdleTimeMillis=1000 * 60 * 30
                timeBetweenEvictionRunsMillis=1000 * 60 * 30
                numTestsPerEvictionRun=3
                testOnBorrow=true
                testWhileIdle=true
                testOnReturn=false
                validationQuery="SELECT 1"
                jdbcInterceptors="ConnectionState;StatementCache(max=200)"
            }
        }
    }
    localDev {
        dataSource {
            dbCreate = "update" // one of 'create', 'create-drop', 'update', 'validate', ''
            url = "jdbc:mysql://localhost/neeisPortal?useUnicode=yes&characterEncoding=UTF-8"
            username = "root"
            password = "Perseverence!2"
            properties {
                validationQuery="select 1"
                testWhileIdle=true
                timeBetweenEvictionRunsMillis=60000
            }
        }
        dataSource_aim{
            dbCreate = "update"
            url = "jdbc:sqlserver://localhost:1433;databaseName=Training"
            driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
            username = "SA"
            password = "jakePoos521"
            logSql = true
            properties {
                maxActive = -1
                minEvictableIdleTimeMillis=1000 * 60 * 30
                timeBetweenEvictionRunsMillis=1000 * 60 * 30
                numTestsPerEvictionRun=3
                testOnBorrow=true
                testWhileIdle=true
                testOnReturn=true
                validationQuery="SELECT 1"
                jdbcInterceptors="ConnectionState;StatementCache(max=200)"
            }
        }
    }
}
