import org.codehaus.groovy.grails.commons.ApplicationAttributes
class BootStrap {

    def init = { servletContext ->
//
//            def ctx=servletContext.getAttribute(
//                    ApplicationAttributes.APPLICATION_CONTEXT)
//            def dataSource = ctx.dataSource
//            dataSource.setMinEvictableIdleTimeMillis(1000 * 60 * 30)
//            dataSource.setTimeBetweenEvictionRunsMillis(1000 * 60 * 30)
//            dataSource.setNumTestsPerEvictionRun(3)
//
//            dataSource.setTestOnBorrow(true)
//            dataSource.setTestWhileIdle(false)
//            dataSource.setTestOnReturn(false)
//            dataSource.setValidationQuery("SELECT 1")
//            dataSource.properties.each { log.info it }

    }
    def destroy = {
    }
}
