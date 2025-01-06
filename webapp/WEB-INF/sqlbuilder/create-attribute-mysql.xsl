<?xml version="1.0" encoding="UTF-8" ?>

<!--
    Document   : create-attribute-mysql.xsl
    Created on : April 22, 2004, 9:22 PM
    Author     : gabor
    Description:
        Create attribute SQL script generator for MT OMS.
        Database type: mysql
-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text"/>

    <xsl:template match="attribute">
        <xsl:variable name="classname"><xsl:value-of select="class-name"/></xsl:variable>
        <xsl:variable name="attributename"><xsl:value-of select="name"/></xsl:variable>
        

                <xsl:text>alter table om_value_</xsl:text><xsl:value-of select="normalize-space($classname)"/>
        <xsl:text> add </xsl:text><xsl:value-of select="normalize-space($attributename)"/>
        <xsl:text> </xsl:text>
        <xsl:value-of select="type"/>
        <xsl:variable name="length"><xsl:value-of select="length"/></xsl:variable>
        <xsl:if test="$length != ''">
            <xsl:choose>
                <xsl:when test="$length != 0">
                    <xsl:text>(</xsl:text><xsl:value-of select="length"/><xsl:text>)</xsl:text>
                </xsl:when>
            </xsl:choose>
        </xsl:if>

        <xsl:variable name="required"><xsl:value-of select="required"/></xsl:variable>
        <xsl:if test="$required !=''">
            <xsl:choose>
                <xsl:when test="$required='true'">
                    <xsl:text> not null </xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text> null </xsl:text>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
            
    </xsl:template>
    
</xsl:stylesheet>
