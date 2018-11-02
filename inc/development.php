<?php

function cl ($var) {
		echo '<script>';
		echo 'console.log(' . json_encode($var) . ')';
		echo '</script>';
}
