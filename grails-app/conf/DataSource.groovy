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
            url = "jdbc:sqlserver://74.100.162.203:1433;databaseName=Training"
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
                testOnReturn=true
                validationQuery="SELECT 1"
                jdbcInterceptors="ConnectionState;StatementCache(max=200)"
            }
        }
    }
    test {
        dataSource {
            dbCreate = "update"
            url = "jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE"
        }
        dataSource_aim{

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
œ
        dataSource_aim{
            dbCreate = "update"
            url = "jdbc:sqlserver://74.100.162.203:1433;databaseName=Training"
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
}
