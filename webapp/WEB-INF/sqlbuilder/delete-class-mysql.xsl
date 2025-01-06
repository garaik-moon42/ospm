<?xml version="1.0" encoding="UTF-8" ?>

<!--
    Document   : delete-class-mysql.xsl
    Created on : April 22, 2004, 9:20 PM
    Author     : gabor
    Description:
        Delete class SQL script generator for MT OMS.
        Database tpe: mysql
-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text"/>

    <xsl:template match="class">
        <xsl:variable name="classname"><xsl:value-of select="name"/></xsl:variable>
        
        <xsl:text>drop table om_value_</xsl:text><xsl:value-of select="normalize-space($classname)"/>
    </xsl:template>    

</xsl:stylesheet>
