
namespace CSB
{
    partial class Form1
    {
        /// <summary>
        /// Wymagana zmienna projektanta.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Wyczyść wszystkie używane zasoby.
        /// </summary>
        /// <param name="disposing">prawda, jeżeli zarządzane zasoby powinny zostać zlikwidowane; Fałsz w przeciwnym wypadku.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Kod generowany przez Projektanta formularzy systemu Windows

        /// <summary>
        /// Metoda wymagana do obsługi projektanta — nie należy modyfikować
        /// jej zawartości w edytorze kodu.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.dvgReadList = new System.Windows.Forms.DataGridView();
            this.Ink_Id_lab = new System.Windows.Forms.Label();
            this.ink_Id = new System.Windows.Forms.Label();
            this.dateTime = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dvgReadList)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(40, 67);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(120, 13);
            this.label1.TabIndex = 6;
            this.label1.Text = "Zawartość tabeli osoba:";
            // 
            // dvgReadList
            // 
            this.dvgReadList.AllowUserToAddRows = false;
            this.dvgReadList.AllowUserToDeleteRows = false;
            this.dvgReadList.AllowUserToOrderColumns = true;
            this.dvgReadList.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dvgReadList.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dvgReadList.Location = new System.Drawing.Point(43, 83);
            this.dvgReadList.Name = "dvgReadList";
            this.dvgReadList.ReadOnly = true;
            this.dvgReadList.RowHeadersWidth = 62;
            this.dvgReadList.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dvgReadList.Size = new System.Drawing.Size(940, 361);
            this.dvgReadList.TabIndex = 5;
            this.dvgReadList.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dgvOsoba_CellContentClick);
            this.dvgReadList.CellDoubleClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dgvOsoba_CellDoubleClick);
            // 
            // Ink_Id_lab
            // 
            this.Ink_Id_lab.AutoSize = true;
            this.Ink_Id_lab.Location = new System.Drawing.Point(40, 23);
            this.Ink_Id_lab.Name = "Ink_Id_lab";
            this.Ink_Id_lab.Size = new System.Drawing.Size(18, 13);
            this.Ink_Id_lab.TabIndex = 11;
            this.Ink_Id_lab.Text = "ID";
            this.Ink_Id_lab.Click += new System.EventHandler(this.label8_Click);
            // 
            // ink_Id
            // 
            this.ink_Id.AutoSize = true;
            this.ink_Id.Location = new System.Drawing.Point(78, 23);
            this.ink_Id.Name = "ink_Id";
            this.ink_Id.Size = new System.Drawing.Size(0, 13);
            this.ink_Id.TabIndex = 12;
            // 
            // dateTime
            // 
            this.dateTime.AutoSize = true;
            this.dateTime.BackColor = System.Drawing.SystemColors.Control;
            this.dateTime.Location = new System.Drawing.Point(884, 39);
            this.dateTime.Name = "dateTime";
            this.dateTime.Size = new System.Drawing.Size(0, 13);
            this.dateTime.TabIndex = 13;
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(887, 491);
            this.button1.Margin = new System.Windows.Forms.Padding(2);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(96, 23);
            this.button1.TabIndex = 14;
            this.button1.Text = "Odśwież";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1074, 554);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.dateTime);
            this.Controls.Add(this.ink_Id);
            this.Controls.Add(this.Ink_Id_lab);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.dvgReadList);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dvgReadList)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label Ink_Id_lab;
        private System.Windows.Forms.Label ink_Id;
        private System.Windows.Forms.DataGridView dvgReadList;
        private System.Windows.Forms.Button button1;
        public System.Windows.Forms.Label dateTime;
    }
}

