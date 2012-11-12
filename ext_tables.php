<?php
if (!defined ('TYPO3_MODE')) {
    die ('Access denied.');
}

// Add Static Typoscript
t3lib_extMgm::addStaticFile($_EXTKEY, 'static/', 'Peter Ruijter website config');
?>