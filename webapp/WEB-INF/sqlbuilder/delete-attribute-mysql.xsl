<?xml version="1.0" encoding="UTF-8" ?>

<!--
    Document   : delete-attribute-mysql.xsl
    Created on : April 22, 2004, 9:24 PM
    Author     : gabor
    Description:
        Delete attribute SQL script generator for MT OMS.
        Database type: mysql 
-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text"/>

    <xsl:template match="attribute">
        <xsl:variable name="classname"><xsl:value-of select="class-name"/></xsl:variable>
        <xsl:variable name="attributename"><xsl:value-of select="name"/></xsl:variable>

        <xsl:text>alter table om_value_</xsl:text><xsl:value-of select="normalize-space($classname)"/>
        <xsl:text> drop column </xsl:text><xsl:value-of select="normalize-space($attributename)"/>
    </xsl:template>
    
</xsl:stylesheet>
