<?xml version="1.0" encoding="UTF-8" ?>

<!--
    Document   : create-class-mysql.xsl
    Created on : April 22, 2004, 9:06 PM
    Author     : gabor
    Description:
        Create class script generator for MT OMS.
        Database type: MySQL
-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text"/>

    <xsl:template match="class">
        <xsl:variable name="classname"><xsl:value-of select="name"/></xsl:variable>
        
        <xsl:text>create table om_value_</xsl:text><xsl:value-of select="normalize-space($classname)"/>
        <xsl:text>
        (
        </xsl:text>
        <xsl:call-template name="common-fields"/>
        <xsl:call-template name="primary-key"/>
        <xsl:text>
        );
        </xsl:text>
    </xsl:template>
    
    <xsl:template name="common-fields">
        <xsl:text>
            om_object varchar(64) not null,
            language_code varchar(2) not null,
            country_code varchar(2) not null,
        </xsl:text>
    </xsl:template>
    
    <xsl:template name="primary-key">
        primary key (om_object, language_code, country_code)
    </xsl:template>
    
</xsl:stylesheet>
