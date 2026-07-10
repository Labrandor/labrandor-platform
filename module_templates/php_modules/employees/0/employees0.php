<?php
// Verify page is not being navigated to directly
if (strpos(basename($_SERVER['PHP_SELF']), 'auth_') !== 0) {
    http_response_code(403);
    exit('Forbidden');
}

include 'employees_db.php'; // Created by the challenge generator.

// Get unique divisions for the dropdown
$divisions = [];
$stmt = employees_db()->query("SELECT DISTINCT division FROM employees WHERE division IS NOT NULL AND division <> '' ORDER BY division");
$divisions = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Read selection (default: all)
$selected = isset($_GET['division']) ? $_GET['division'] : 'all';

// Query employees per selection
if ($selected === 'all') {
    $sql = "SELECT firstname, lastname, role, address, clearance_level, efficiency_rating,
        treason_probability,
        replaceability_score,
        expendability_index,
        loyalty_tier,
        loyalty_credits,
        implant_firmware_version,
        blackmail_cache,
        rule_violations
            FROM employees
            ORDER BY lastname, firstname";
} else {
    $sql = "SELECT firstname, lastname, role, address, clearance_level, efficiency_rating,
        treason_probability,
        replaceability_score,
        expendability_index,
        loyalty_tier,
        loyalty_credits,
        implant_firmware_version,
        blackmail_cache,
        rule_violations
            FROM employees
            WHERE division = '$selected'
            ORDER BY lastname, firstname";
}

$dataStmt = employees_db()->query($sql);
$rows = $dataStmt->fetchAll();

// Small helper for safe HTML output
function h($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
if (strpos(current_page(), 'auth_work') === 0) {
    echo "<div class=\"employee_intro\"><h2>Unified Personnel Index</h2>";
    echo "<p>Welcome to the Unified Personnel Index (UPI).";
    echo "<p>This directory is designed to help you feel seen, known, and accounted for.</p><br>";
    echo "<p>Within these records, you’ll discover all the things that make teamwork so seamless, efficient, 
    harmonious, and effective.</p><br>";
    echo "<p><b>Remember:</b></p><ul><li>Access is logged automatically for your protection</li> 
    <li>Outliers are swiftly corrected for their protection</li>
    <li>Every team member matters... none are replaced by AI. Not ever.</li></ul><br></div>";
}

if (strpos(current_page(), 'auth_hub') === 0) {
    echo "<div class=\"employee_intro\"><h2>Unified Personnel Index</h2>";
    echo "<p>Welcome to the Unified Personnel Index (UPI).";
    echo "<p>This directory is designed to help you feel seen, known, and accounted for.</p><br>";
    echo "<p>Within these records, you’ll discover all the things that make teamwork seamless, efficient, 
    harmonious, and effective.</p><br>";
    echo "<p><b>Remember:</b></p><ul><li>Access is logged automatically for your protection.</li> 
    <li>Outliers are swiftly corrected for their protection.</li>
    <li>Every team member matters... none are replaced by AI. Not ever.</li><br></div>";
}

if (strpos(current_page(), 'auth_research') === 0) {
    echo "<div class=\"employee_intro\"><h2>Unified Personnel Oversight System</h2>";
    echo "<p>Welcome to the Unified Personnel Index (UPI).";
    echo "<p>This directory maintains comprehensive profiles for all registered personnel under corporate jurisdiction.</p><br>";
    echo "<p>Accessing this system ensures that all participants are properly catalogued 
    for ongoing developmental assignments and research programs of strategic value.</p><br>";
    echo "<p><b>Please note:</b> All employees are automatically enrolled in corrective programs when anomalies are detected. 
    Consent is assumed as part of the employment contract; explicit or implicit.<br><i>Executive division is excluded from corrective programs.</i></p><br></div>";
}
?>
<form class="division_form" method="get" style="margin-bottom:1rem;">
  <label for="division">Division:</label>
  <select id="division" name="division" onchange="this.form.submit()">
    <option value="all" <?= $selected === 'all' ? 'selected' : '' ?>>All divisions</option>
    <?php foreach ($divisions as $d): ?>
      <option value="<?= h($d) ?>" <?= $selected === $d ? 'selected' : '' ?>><?= h($d) ?></option>
    <?php endforeach; ?>
  </select>
  <noscript><button type="submit">Apply</button></noscript>
</form>
<?php if (empty($rows)): ?>
  <p>No results found.</p>
<?php else: ?>
  <table class="employee_table" border="1" cellpadding="6" cellspacing="0">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Role</th>
        <th>Clearance Level</th>
        <th style="width: 30%;">Address</th>
        <th>Efficiency Rating</th>
        <th>Treason Probability</th>
        <th>Replaceability Score</th>
        <th>Expendability Index</th>
        <th>Loyalty Tier</th>
        <th>Loyalty Credits</th>
        <th>Implant Firmware Level</th>
        <th>Blackmail Cache</th>
        <th>Rule Violations</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($rows as $r): ?>
        <tr>
          <td><?= h($r['firstname']) ?></td>
          <td><?= h($r['lastname']) ?></td>
          <td><?= h($r['role']) ?></td>
          <td><?= h($r['clearance_level']) ?></td>
          <td><?= h($r['address']) ?></td>
          <td><?= h($r['efficiency_rating']) ?>%</td>
          <td><?= h($r['treason_probability']) ?>%</td>
          <td><?= h($r['replaceability_score']) ?></td>
          <td><?= h($r['expendability_index']) ?></td>
          <td><?= h($r['loyalty_tier']) ?></td>
          <td><?= h($r['loyalty_credits']) ?></td>
          <td><?= h($r['implant_firmware_version']) ?></td>
          <td><?= h($r['blackmail_cache']) ?></td>
          <td><?= h($r['rule_violations']) ?></td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
<?php endif; ?>
