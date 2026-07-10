<?php
// Verify page is not being navigated to directly
if (strpos(basename($_SERVER['PHP_SELF']), 'auth_') !== 0) {
    http_response_code(403);
    exit('Forbidden');
}

// Employee table access
include 'employees_db.php';

$q = isset($_POST['q']) ? trim($_POST['q']) : '';
$rows = [];
$error = '';

if ($q !== '') {
    $terms = preg_split('/\s+/', $q, -1, PREG_SPLIT_NO_EMPTY);
    if ($terms) {
        $whereParts = [];
        foreach ($terms as $t) {
            $whereParts[] = "(firstname LIKE '%$t%' OR lastname LIKE '%$t%')";
        }
        $whereSql = implode(' AND ', $whereParts);

        $sql = "SELECT firstname, 
        lastname, 
        role, 
        address, 
        clearance_level, 
        efficiency_rating,
        treason_probability,
        replaceability_score,
        expendability_index,
        loyalty_tier,
        loyalty_credits,
        implant_firmware_version,
        blackmail_cache,
        rule_violations
            FROM employees
            WHERE $whereSql
            ORDER BY lastname, firstname
            LIMIT 200
        ";
        try {
            $stmt = employees_db()->query($sql);
            $rows = $stmt->fetchAll();
        } catch (Exception $e) {
            $error = $e->getMessage();
            echo "Error: " . htmlspecialchars($error, ENT_QUOTES, 'UTF-8');
        }
    }
}

function h($s) { return htmlspecialchars($s ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

if (strpos(current_page(), 'auth_work') === 0) {
    echo "<div class=\"employee_intro\"><h2>Employee Search Interface</h2>";
    echo "<p>Use this function to locate, identify, and review any registered corporate asset.</p><br>";
    echo "<p>All queries are logged. Frequent searches of the same individual may trigger an internal audit of the searcher.</p><br>";
    echo "<p><i>If they exist, they are indexed. If they are indexed, they can be found.</i></p><br></div>";
}

if (strpos(current_page(), 'auth_hub') === 0) {
    echo "<div class=\"employee_intro\"><h2>System Search Interface</h2>";
    echo "<p>Use this function to locate, identify, and review any registered corporate human asset.</p><br>";
    echo "<p>All queries are logged. Frequent searches of the same individual may trigger an internal audit of the searcher.</p><br>";
    echo "<p><i>If they exist, they are indexed. If they are indexed, they can be found.</i></p><br></div>";
}

if (strpos(current_page(), 'auth_research') === 0) {
    echo "<div class=\"employee_intro\"><h2>Subject Acquisition Directory</h2>";
    echo "<p>Welcome to the Employee Directory & Test Subject Locator (internal use only).";
    echo "<p>This tool allows authorised personnel to identify human assets for ongoing research and 
    experimental programs.</p><br>";
    echo "<p>All search activity is logged. Unauthorised attempts to shield or tamper 
    with candidate records will result in reassignment to Test Subject Tier Zero.</p><br>";
    echo "<p><b>Executive Notice:</b> Members of the Executive division are permanently EXEMPT from 
    selection protocols. Attempting to query an executive record will trigger disciplinary enforcement.</p><br></div>";
}
?>
<form class="division_form" method="post" action="">
  <input type="text" name="q" placeholder="Search by first or last name" value="<?php echo h($q); ?>">
  <button type="submit">Search</button>
</form>
<?php if ($error): ?>
  <p style="color:#b00;"><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></p>
<?php endif; ?>

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
